import { NumberInput, NumberInputProps } from '@mantine/core';

const CurrencyInput = (props: NumberInputProps) => {
    return (
        <NumberInput
            {...props}
            parser={(value) =>
                value?.replace(/\$\s?|(,*)/g, '')
            }
            formatter={(value) =>
                !Number.isNaN(parseFloat(value || 'a'))
                    ? (value || '').replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ','
                    )
                    : ''
            }
            min={0}
        />
    );
};

export default CurrencyInput;