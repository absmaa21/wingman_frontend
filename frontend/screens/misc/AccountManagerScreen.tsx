import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Color} from '../../../Settings';
import {useApi} from '../../contexts/apiContext';
import UserCard from "../../components/UserCard";

export default function AccountManagerScreen() {
    const userApi = useApi().getUserApi();
    const activeUser = userApi.getActiveUser()
    const inactiveUserList = userApi.getInactiveUsers() // TODO active user also in list

    return (
        <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
            <UserCard user={activeUser} isActiveUser />
            {inactiveUserList.map(user => <UserCard user={user} />)}
            <UserCard/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 16,
        backgroundColor: Color.backgroundPrimary,
    }
})
