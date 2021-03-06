import { Tooltip } from '@mantine/core';
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';
import InfoIcon from './InfoIcon';

type IconTypes = 'delete' | 'edit' | 'info';

interface Props {
    label: string;
    iconType: IconTypes
}

const Icon = ({ label, iconType }: Props) => {
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
            {icon}
        </Tooltip>
    );
};

export default Icon;