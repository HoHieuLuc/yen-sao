import EditFeaturedProducts from './EditFeaturedProducts';

import { FeaturedProductsData } from '../../../../types';

interface Props {
    data: FeaturedProductsData;
}

const FeaturedProducts = ({ data }: Props) => {
    return (
        <>
            {data && (
                <EditFeaturedProducts
                    data={data}
                />
            )}
        </>
    );
};

export default FeaturedProducts;