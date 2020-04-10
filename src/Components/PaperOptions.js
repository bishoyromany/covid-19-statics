import React, {useState, useEffect} from 'react'
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import ShareIcon from '@material-ui/icons/Share';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import CodeIcon from '@material-ui/icons/Code';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/Button';
import ReactTooltip from "react-tooltip";

const PaperOptions = ({ID}) => {
    const [fullPage, setFullPage] = useState(false);

    useEffect(() => {
        if(fullPage){
            document.getElementById(ID).className += ' fullPageEnable';
        }else{
            document.getElementById(ID).className = document.getElementById(ID).className.replace('fullPageEnable', '');
        }
    }, [fullPage])

    return(
        <Grid container className="PaperOptions">
            <Grid item xs={6} className="share">
                <IconButton color="primary" component="span" data-tip="Share The Page In Social Medai Or Include This Component In Your Page">
                    <ShareIcon />
                </IconButton>
            </Grid>

            <Grid item xs={6} className="fullPage">
                <IconButton color="primary" component="span" data-tip="View This Component In Full Page Mode">
                    {
                        fullPage ? <FullscreenExitIcon onClick={() => setFullPage(false)} /> : <FullscreenIcon onClick={() => setFullPage(true)} />
                    }
                </IconButton>
            </Grid>
        </Grid >
    );
};

export default PaperOptions;