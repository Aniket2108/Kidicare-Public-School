import { Container, Grid, Paper } from '@mui/material';
import SeeNotice from '../../SeeNotice/SeeNotice';
import Students from '../../../../assets/img1.png';
import Classes from '../../../../assets/img2.png';
import Teachers from '../../../../assets/img3.png';
import Fees from '../../../../assets/img4.png';
import CountUp from 'react-countup';
import  '../AdminHomePage/AdminHomePage.css';

const AdminHomePage = () => {
    return (
        <Container maxWidth="lg" className="container">
            <Grid container spacing={3}>
                <Grid item xs={12} md={3} lg={3}>
                    <Paper className="card">
                        <img src={Students} alt="Students" className="image" />
                        <p className="title">Total Students</p>
                        <CountUp start={0} end={100} duration={2.5} className="data" />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Paper className="card">
                        <img src={Classes} alt="Classes" className="image" />
                        <p className="title">Total Classes</p>
                        <CountUp start={0} end={20} duration={5} className="data" />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Paper className="card">
                        <img src={Teachers} alt="Teachers" className="image" />
                        <p className="title">Total Teachers</p>
                        <CountUp start={0} end={30} duration={2.5} className="data" />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Paper className="card">
                        <img src={Fees} alt="Fees" className="image" />
                        <p className="title">Fees Collection</p>
                        <CountUp start={0} end={23000} duration={2.5} prefix="₹" className="data" />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className="notice">
                        <SeeNotice />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminHomePage;
