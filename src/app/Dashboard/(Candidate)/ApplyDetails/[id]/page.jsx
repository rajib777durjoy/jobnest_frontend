import DetailsPage from '@/Component/Candidate/DetailsPage';
import React from 'react';

const ApplyDetails =async ({params}) => {
    const id= await params.id;
    if(!id){
        return ;
    }
    return (
        <div>
            <DetailsPage id={id}></DetailsPage>
        </div>
    );
};

export default ApplyDetails;