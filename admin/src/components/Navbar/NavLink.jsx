import { useState } from 'react';
import { Button, Collapse, Box } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';

const NavLink = ({ title, to, size, active, color, subLinks }) => {
    const location = useLocation();
    const [opened, setOpen] = useState(
        subLinks?.map(o => o.to).includes(location.pathname)
    );
    const style = {
        display: 'flex', alignItems: 'start'
    };
    if (subLinks) {
        return (<>
            <Button
                fullWidth
                variant={opened ? 'light' : 'subtle'}
                size={size}
                onClick={() => setOpen(!opened)}
                style={style}
                rightIcon={opened ?
                    <FontAwesomeIcon icon={faAngleDown} /> :
                    <FontAwesomeIcon icon={faAngleRight} />
                }
            >
                {title}
            </Button>
            <Collapse className='collapse-item' in={opened}>
                {subLinks.map(subLink => (
                    <Button
                        key={subLink.to}
                        fullWidth
                        variant={location.pathname.includes(subLink.to) ? 'filled' : 'subtle'}
                        component={Link}
                        to={subLink.to}
                        size={size}
                        style={style}
                    >
                        <Box ml='xs'>
                            {subLink.title}
                        </Box>
                    </Button>
                ))}
            </Collapse>
        </>);
    }
    return (
        <Button
            fullWidth
            variant={active ? 'filled' : 'subtle'}
            component={Link}
            to={to}
            size={size}
            style={style}
            color={color}
        >
            {title}
        </Button>
    );
};

export default NavLink;