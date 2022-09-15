 import {Card, CardContent, Typography} from "@mui/material";


const InfoBox = ({title, cases, total}) => {
    return (
        <Card className="infoBox">
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">{title}</Typography>
                <Typography className="infoBox__cases" color="textInfo" variant="h5">{cases}</Typography>
                <Typography className="infoBox__total" color="textSecondary">Total: {total}</Typography>
            </CardContent>
        </Card>
    );
}

export default InfoBox;