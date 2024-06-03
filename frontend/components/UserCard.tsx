import React from 'react';
import {Alert, Image, StyleSheet, TouchableOpacity} from "react-native";
import {Color} from "../../Settings";
import {logInfo} from "../../backend/utils/log-system/log-system";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RNRestart from "react-native-restart";
import PropTypes from "prop-types";

UserCard.propTypes = {
    user: PropTypes.object,
    isActiveUser: PropTypes.bool
}

function UserCard({user, isActiveUser}: any) {
    function handleLongPress() {
        if (!user) return
        const playerName = user.accountInfo.acct.game_name
        const playerTag = user.accountInfo.acct.tag_line
        Alert.alert('Delete confirmation', 'Are you sure you want to remove the user: ' + playerName + "#" + playerTag, [
            {text: 'OK', onPress: () => logInfo("UserCard.tsx: User deletion confirmed")},
            {text: 'CANCEL', onPress: () => logInfo("UserCard.tsx: User deletion canceled")},
        ])
    }

    function handleLogout() {
        if (user) return
        // TODO
        RNRestart.restart()
    }

    return (
        <TouchableOpacity
            style={[styles.card, {backgroundColor: isActiveUser ? Color.grey : Color.backgroundSecondary}]}
            onLongPress={() => handleLongPress()}
            onPress={() => handleLogout()}
            key={user ? user.accountXp?.Subject : 'a'}
        >
            {user ? (
                <Image
                    source={{
                        uri: 'https://media.valorant-api.com/playercards/f32eb1e5-4cd3-0520-88a3-0cafb7423002/displayicon.png',
                    }}
                    style={styles.image}
                />
            ) : (
                <MaterialCommunityIcons name={'plus'} size={64} color={Color.textSecondary}/>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 96,
        height: 96,
        borderRadius: 12,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
})

export default UserCard;
