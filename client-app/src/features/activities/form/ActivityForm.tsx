import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import {v4 as uuid} from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from "mobx-react-lite";
interface IProps {
  activity: IActivity;
}
 const ActivityForm: React.FC<IProps> = ({
  activity: initialFormState
}) => {

  const activityStore = useContext(ActivityStore)
  const {createActivity , editActivity , submitting,cancelOpenForm} = activityStore
  const InitializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };
  const [activity, setActivity] = useState<IActivity>(InitializeForm);

  const handleInputChange = (event:FormEvent<HTMLTextAreaElement | HTMLInputElement> ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: [value]});
  };

  const handleSubmit = () =>{
      if(activity.id.length===0)
      {
        var newActivity = {
          ...activity,
          id : uuid()
        }
          createActivity(newActivity);
      }
      else {
        editActivity(activity)
      }
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder="Title"
          onChange={handleInputChange}
          name="title"
          value={activity.title}
        />
        <Form.TextArea
          rows={2}
          placeholder="Description"
          onChange={handleInputChange}
          name="description"
          value={`${activity.description}`}
        />
        <Form.Input
          placeholder="Category"
          onChange={handleInputChange}
          name="category"
          value={activity.category}
        />
        <Form.Input
          type="datetime-local"
          placeholder="Date"
          onChange={handleInputChange}
          name="date"
          value={activity.date}
        />
        <Form.Input
          placeholder="City"
          onChange={handleInputChange}
          name="city"
          value={activity.city}
        />
        <Form.Input
          placeholder="Venue"
          onChange={handleInputChange}
          name="venue"
          value={activity.venue}
        />

        <Button loading={submitting} floated="right" type="submit" positive content="Submit" />
        <Button
          onClick={cancelOpenForm}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
