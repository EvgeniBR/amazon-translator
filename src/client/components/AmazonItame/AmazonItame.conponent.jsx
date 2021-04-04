/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: '15px',
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 1000,
    background: 'lightgrey',
  },
  image: {
    width: 138,
    height: 138,
    display: 'flex',
    flexDirection: 'column',
  },
  img: {
    borderRadius: '50%',
    margin: 'auto',
    display: 'block',
    maxWidth: '95%',
    maxHeight: '95%',
    marginTop: '55px',
  },
  price: {
    borderRadius: '50%',
    display: 'block',
    maxWidth: '85%',
    maxHeight: '85%',
    background: 'orange',
    padding: '5px',
    marginTop: '45px',
  },
  bottomBox: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

const AmazonItame = ({ data, removeItem }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={data.pic} />
              <Typography className={classes.price} variant="subtitle1">{data.price}</Typography>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {data.originalTitle}
                </Typography>
                <hr />
                <Typography dir="rtl" variant="body2" gutterBottom>
                  •
                  {data.heb}

                </Typography>
                <br />
                <Typography dir="rtl" variant="body2" color="textSecondary">
                  •
                  {data.ar}
                </Typography>
              </Grid>
              <Grid item className={classes.bottomBox}>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  <a href={data.link} target="_blank" rel="noreferrer">Click for amazon page ==&gt;</a>
                </Typography>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>

                  <span onClick={() => removeItem(data.id)} role="img" aria-label="trash">🗑️</span>

                </Typography>
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default AmazonItame;
