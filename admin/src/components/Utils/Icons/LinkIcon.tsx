import { ActionIcon, DefaultMantineColor, Tooltip } from '@mantine/core';
import { Link } from 'react-router-dom';
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';
import InfoIcon from './InfoIcon';

interface Props {
    label: string;
    to: string;
    color?: DefaultMantineColor;
    iconType: 'delete' | 'edit' | 'info';
}

const LinkIcon = ({ label, to, color, iconType }: Props) => {
    let icon = null;
    switch (iconType) {
        case 'delete':
            icon = <DeleteIcon />;
            break;
        case 'edit':
            icon = <EditIcon />;
            break;
        case 'info':
            icon = <InfoIcon />;
            break;
        default:
            break;
    }
    return (
        <Tooltip
            label={label}
            withArrow
        >
            <ActionIcon
                component={Link}
                to={to}
                color={color}
            >
                {icon}
            </ActionIcon>
        </Tooltip>
    );
};

export default LinkIcon;