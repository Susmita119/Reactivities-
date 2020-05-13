import React, { useContext } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import ActivityStore from '../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';


const NavBar: React.FC = () => {
    const activities = useContext(ActivityStore);
    return (
        <Menu fixed="top" inverted>
            <Container>
        <Menu.Item header>
            <img src="/assets/logo.png" alt="logo" style={{marginRight : '10px'}}/>
            Reactivities                            
        </Menu.Item>
        <Menu.Item name='Activities'/>
        <Menu.Item>
            <Button onClick={activities.openCreateForm} positive content='Create activity'></Button>
        </Menu.Item>
        </Container>
      </Menu>
    )
}

export default observer(NavBar);
