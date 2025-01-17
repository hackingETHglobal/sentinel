import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckIcon from '@material-ui/icons/CheckCircleOutline';
import WarningIcon from '@material-ui/icons/ErrorOutline';
import { networkChange } from "../../Actions/NetworkChange";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import green from "@material-ui/core/es/colors/green";
import blue from "@material-ui/core/es/colors/blue";
import lang from './../../Constants/language';


export default class NetworkChangeDialog extends React.Component {
    state = {
        open: false,
        close: false,
        isLoading: false,
        success: false,
        uri: false,
        snackbar: '',
        authCode: '',
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open, isLoading: nextProps.isLoading,
            uri: nextProps.uri, snackbar: nextProps.snackbar
        })
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
        this.props.close();
    };

    render() {
        let { language } = this.props;
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{lang[language].SwitchPrivate}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {lang[language].EnterAuthCode}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="authCode"
                            label={lang[language].AuthCode}
                            type="text"
                            fullWidth
                            onKeyPress={(e) => { if (e.key === 'Enter') this.props.getGatewayAddr(this.state.authCode) }}
                            value={this.state.authCode}
                            onChange={(e) => { this.setState({ authCode: e.target.value }) }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.handleClose}
                            color="primary"
                            disabled={this.state.isLoading}
                        >
                            {lang[language].Cancel}
                        </Button>
                        <Button
                            variant={!this.state.success ? 'text' : 'contained'}
                            disabled={this.state.isLoading}
                            onClick={() => this.props.getGatewayAddr(this.state.authCode)}
                            color={'primary'}
                            style={{ minWidth: 100 }}
                        >
                            {lang[language].Connect}
                        </Button>

                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const styles = {
    buttonProgress: {
        color: blue[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    wrapper: {
        margin: 4,
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}