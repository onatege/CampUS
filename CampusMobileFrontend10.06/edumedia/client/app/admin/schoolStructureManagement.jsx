import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FacultyManagement from '../../components/facultyManagement';
import DepartmentManagement from '../../components/departmentManagement';

const initialLayout = { width: Dimensions.get('window').width };

export default function TabViewExample() {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'departments', title: 'Departments' },
        { key: 'faculties', title: 'Facultıes' },
    ]);

    const renderScene = SceneMap({
        departments: DepartmentManagement,
        faculties: FacultyManagement,
    });

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={(props) => (
                <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: 'white' }}
                    style={{ backgroundColor: '#141218' }}
                />
            )}
        />
    );
}
