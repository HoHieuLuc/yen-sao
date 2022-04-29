import { Tooltip } from '@mantine/core';
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';

type IconTypes = 'delete' | 'edit';

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
        default:
            break;
    }
    return (
        <Tooltip
            label={label}
            withArrow
            style={{ width: '100%' }}
        >
            {icon}
        </Tooltip>
    );
};

export default Icon;