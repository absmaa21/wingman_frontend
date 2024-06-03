import PropTypes from 'prop-types'
import {Color} from '../../Settings';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

BottomBarTab.propTypes = {
    handlePagePress: PropTypes.func.isRequired,
    tabName: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
}

export default function BottomBarTab(props: any) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => props.handlePagePress(props.tabName)}
        >
            <MaterialCommunityIcons
                name={props.iconName}
                size={36}
                color={props.isActive ? Color.accent : Color.textPrimary}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
