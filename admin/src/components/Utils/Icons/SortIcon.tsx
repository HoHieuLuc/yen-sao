import ArrowDown from './ArrowDown';
import ArrowsUpDown from './ArrowsUpDown';
import ArrowUp from './ArrowUp';

interface Props {
    currentSort: string | null;
    ascValue: string;
    descValue: string;
}

const SortIcon = ({ currentSort, ascValue, descValue }: Props) => {
    return (
        <>
            {currentSort === ascValue && (
                <ArrowUp />
            )}
            {currentSort === descValue && (
                <ArrowDown />
            )}
            {currentSort !== ascValue && currentSort !== descValue && (
                <ArrowsUpDown />
            )}
        </>
    );
};

export default SortIcon;