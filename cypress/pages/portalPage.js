import {SSP_PORTAL_URL} from '../constants/constants'
import { getRandomString } from '../utils/utils'
class PortalPage {

  approver_name =  "Vanshika Kaul"
  project_name =  "laod001-aiops01"
  // vm_name = getRandomString(5)
  vm_name = "auto-testing"
  snapshot_name = this.vm_name+"snapshot"
  snapshot_description = "Test description"
  schedule_name="auto-schedule"
  one_week="7 days"
  getVmName(){
    return this.vm_name
  }

  setVmName(vmName){
    this.vm_name = vmName
    return vmName
  }


  getSnapshotName(){
    return this.snapshot_name
  }


  setSnapshotName(snapshotName){
    this.snapshot_name = snapshotName
    return snapshotName
  }

  getApproverName(){
    return this.approver_name
  }

  setApproverName(approverName){
    this.approver_name = approverName
    return approverName
  }

  getProjectName(){
    return this.project_name
  }


  setProjectName(projectName){
    this.project_name = projectName
    return projectName
  }

    visit() {
      cy.visit(SSP_PORTAL_URL);  // change URL based on your app
    }
    
    getHeader() {
        return cy.get('h1'); // Replace 'h1' with a specific selector of an element that confirms page load
      }

  }
  export const portalPage = new PortalPage();
  