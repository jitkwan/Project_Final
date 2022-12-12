import img from '../../assets/images/error_page.svg'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import './error.css'

const Error = () => {
    return (
        <div className='err-wrapper'>
            <div className='err-page'>
                <img src={img} alt='not found' className='not-found-img' />
                <Typography variant='h4' sx={{mt:5, mb:2}}>Page Not Found</Typography>
                <Typography variant='subtitle1' sx={{mb:2}}>Sorry, the requested URL was not found on this server</Typography>
                <Link to='/'>Back to Homepage</Link>
            </div>
        </div>
        
    )
}

export default Error