import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withRouter } from "react-router-dom";

import axios from "../../api/axios-allure-docker";
import { redirect } from "../../utility/navigate";

const executionName = "Allure Reports Dashboard"
class AllureDockerGenerateReportDialog extends Component {
  generateReport = (projectId) => {
    this.props.showProgress(true);
    axios
      .get(`/generate-report?project_id=${projectId}&execution_name=${executionName}`)
      .then((response) => {
        this.props.showProgress(false);
        this.handleAPISuccessAlert(projectId);
        this.props.getProjects();
        this.props.refreshProject();
      })
      .catch((error) => {
        redirect(error);
        this.props.showProgress(false);
        this.handleAPIErrorAlert(error);
      });
    this.props.handleCloseDialog();
  };

  handleCloseDialog = () => {
    this.props.handleCloseDialog();
  };

  handleAPISuccessAlert = (projectId) => {
    this.props.setAPIAlert(
      "success",
      `Project ${projectId.toUpperCase()} - Report generated succesfully!`,
      true
    );
  };

  handleAPIErrorAlert = (error) => {
    this.props.setAPIAlert(
      "error",
      `Something wrong => ${error.message}`,
      true
    );
  };

  render() {
    let projectId = "";
    if (this.props.projectId) {
      projectId = this.props.projectId;
    }

    return (
      <React.Fragment>
        <Dialog
          open={this.props.open}
          onClose={this.handleCloseDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Generate Report for Project {projectId.toUpperCase()}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to generate a new report?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={() => this.generateReport(projectId)}
              color="secondary"
            >
              Generate Report
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}
export default withRouter(AllureDockerGenerateReportDialog);
