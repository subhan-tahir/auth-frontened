import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Collapse,
    IconButton,
    Typography,
    Box,
    LinearProgress,
    Avatar,
    Skeleton,
    Stack
} from '@mui/material';

import axios from 'axios';
import { Link } from 'react-router-dom';
import zIndex from '@mui/material/styles/zIndex';

const ExpandMore = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== 'expand',
})(({ theme, expand }) => ({
    marginLeft: 'auto',
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const ProductCard = () => {
    // const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card index
    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(false);
    const [itemShow, setItemShow] = useState(5);
    // const handleExpandClick = (index) => {
    //     setExpandedCard((prev) => (prev === index ? null : index));
    // };

    const fetchProducts = async () => {
        setLoader(true)
        const response = await axios.get('https://api.escuelajs.co/api/v1/products');
        // setProducts(response.data);
        setProducts(response.data.slice(0, 20));
        setLoader(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const skeletonCount = 5;

    return (
        <>
            {
                loader ? (
                    <div className=''>
                        <Box sx={{ width: '100%', position: 'absolute', left: 0, top: 0, }} spacing={5} style={{zIndex:'50'}}>
                            <LinearProgress color="error" />
                        </Box>
                        <div className="flex flex-wrap justify-center w-full">
                            {Array.from({ length: skeletonCount }).map((_, index) => (

                               <Stack spacing={1} key={index} sx={{margin:2}}>
                               {/* For variant="text", adjust the height via font-size */}
                               <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
                               {/* For other variants, adjust the size with `width` and `height` */}
                               <Skeleton variant="rectangular" height={190} width={240}/>
                               <Skeleton variant="text" width={240} height={30}/>
                               <Skeleton variant="text"  width={240} height={30}/>
                             </Stack>
                            ))}
                        </div>

                    </div>

                ) :
                    (
                        products.slice(0, itemShow).map((cardItem, index) => {
                            // const isExpanded = expandedCard === index;

                            return (
                                <Link to={`/productdetailpage/${cardItem.title}`} key={index} >

                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardHeader title={cardItem.title.slice(0, 22) + '...'} sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}
                                            titleTypographyProps={{
                                                color: 'black',
                                                fontWeight: 'bold',
                                                fontSize: '20px',
                                            }} variant="h5" />

                                        <CardMedia
                                            component="img"
                                            height="170"
                                            image={cardItem.category.image}
                                            sx={{ hover: 'transform-scale:(1.5)' }}
                                            alt={cardItem.title}

                                        />
                                        <CardContent >
                                            <Typography variant="body2" sx={{ color: 'black', fontSize: '17px', font: '' }}>
                                                {cardItem.description.slice(0,180)+' ......'}
                                            </Typography>
                                            <h1 className='text-xl font-bold mt-2' ><span className='text-red-600'>$ </span>{cardItem.price}</h1>
                                        </CardContent>

                                      
                                    </Card>

                                </Link>
                            );
                        })

                    )
            }
            <div className='w-full'>
                {
                    products.length <= itemShow ?
                        null
                        : (<button onClick={() => setItemShow(itemShow + 4)} className='text-white block m-auto  mt-3 bg-black p-3 rounded-full '>Show more</button>)
                }
            </div>

        </>
    );
};

export default ProductCard;


    