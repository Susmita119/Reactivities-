import React from 'react'
import { Item, Button,Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IActivity } from '../../../app/models/activity';
const ActivityListItem : React.FC<{activity : IActivity}> = ({activity}) => {
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
          <Item>
          <Item.Image size='tiny' circular src='/assets/user.png' />
        <Item.Content>
          <Item.Header as="a">{activity.title}</Item.Header>
          <Item.Meta>{activity.date}</Item.Meta>
          <Item.Description>
           Hosted By
          </Item.Description>
          {/* <Item.Extra>

            <Button
              name ={activity.id}
              loading={target === activity.id && submitting}
              onClick={(e) => deleteActivity(e , activity.id)}
              floated="right"
              content="Delete"
              color="red"
            />
            <Label basic content={activity.category} />
          </Item.Extra> */}
        </Item.Content>
      </Item>
          </Item.Group>
        
        </Segment>
        <Segment>
          <Icon name='clock' />{activity.date}
          <Icon name='marker'/>{activity.venue},{activity.city}
        </Segment>
        <Segment secondary >
          Attendees will go here
        </Segment>
        <Segment clearing>
    <span>{activity.description}</span>
          <Button
             //onClick={()=>loadActivity(activity.id)}
             as={Link} to={`/activities/${activity.id}`}
             floated="right"
              content="view"
              color="blue"
            />
        </Segment>
      </Segment.Group>
       
    )
}

export default ActivityListItem
