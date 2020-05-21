import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { ActivityFormValues } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import {Form as FinalForm , Field} from 'react-final-form'
import TextInput from "../../../app/api/common/form/TextInput";
import TextAreaInput from "../../../app/api/common/form/TextAreaInput";
import SelectInput from "../../../app/api/common/form/SelectInput";
import { category } from "../../../app/api/common/options/categoryOptions";
import DateInput from "../../../app/api/common/form/DateInput";
import { combineDateAndTime } from "../../../app/api/common/util/util";
import {combineValidators, isRequired, hasLengthGreaterThan, composeValidators} from 'revalidate';

const validate = combineValidators({
  title : isRequired({message : 'The event title is required'}),
  category : isRequired('Category'),
  description : composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({message : 'Length should be greater than 5'})
  )(),
  city : isRequired('City'),
  venue : isRequired('Venue'),
  date : isRequired('Date'),
  time : isRequired('Time')
})

interface DetailParam {
  id: string;
}
const ActivityForm: React.FC<RouteComponentProps<DetailParam>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    loadActivity
  } = activityStore;

  const [activity, setActivity] = useState(new ActivityFormValues());
  const[loading , setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id){
      setLoading(true);
      loadActivity(match.params.id).then((activity) => {
        console.log("activity =>",new ActivityFormValues(activity))
         setActivity(new ActivityFormValues(activity));
      }).finally(()=>setLoading(false));
    }
   
  }, [
    loadActivity,
    match.params.id
  ]);

  const handleFinalFormSubmit = (values : any) =>{
    const d= new Date("2015-03-25T12:00:00Z")
    //const dateAndTime = combineDateAndTime(values.date,values.time)
    const dateAndTime = combineDateAndTime(d,d)
    console.log(dateAndTime);
    const{date,time,...activity} = values;
    activity.date = dateAndTime;
    console.log(activity);
    if (!activity.id) {
          var newActivity = {
            ...activity,
            id: uuid(),
          };
          createActivity(newActivity)
        } else {
          editActivity(activity)
        }
  }

  // const handleInputChange = (
  //   event: FormEvent<HTMLTextAreaElement | HTMLInputElement>
  // ) => {
  //   const { name, value } = event.currentTarget;
  //   setActivity({ ...activity, [name]: [value] });
  // };



  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
          validate = {validate}
          initialValues={activity}
          onSubmit = {handleFinalFormSubmit}
          render = {({handleSubmit,invalid,pristine})=>(
            <Form onSubmit={handleSubmit} loading={loading}>
            <Field
             //onChange={handleInputChange}
              placeholder="Title"             
              name="title"
              value={activity.title}
              component ={TextInput}
            />
            <Field
            // onChange={handleInputChange}
              placeholder="Description"             
              name="description"
              rows={3}
              value={`${activity.description}`}
              component = {TextAreaInput}
            />
            <Field
            //onChange={handleInputChange}
              placeholder="Category"              
              name="category"
              value={activity.category}
              component ={SelectInput}
              options={category}
            />
            <Form.Group widths='equal'>
            <Field
              //onChange={handleInputChange}
              placeholder="Date"              
              name="date"
              date={true}
              value={activity.date}
              component ={DateInput}
            />
             <Field
              //onChange={handleInputChange}
              placeholder="Time"              
              name="time"
              time={true}
              value={activity.time}
              component ={DateInput}
            />
            </Form.Group>           
            <Field
            //onChange={handleInputChange}
              placeholder="City"              
              name="city"
              value={activity.city}
              component ={TextInput}
            />
            <Field
            //onChange={handleInputChange}
              placeholder="Venue"              
              name="venue"
              value={activity.venue}
              component ={TextInput}
            />

            <Button
              loading={submitting}
              disabled={loading || invalid || pristine}
              floated="right"
              type="submit"
              positive
              content="Submit"
            />
            <Button
              onClick={activity.id ? () => history.push(`/activities/${activity.id}`)  : () => history.push("/activities")}
              disabled={loading}
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
          )}
          
          />
          
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
