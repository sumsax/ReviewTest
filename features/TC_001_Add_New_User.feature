@sanity
@TC_001_Add_New_User
Feature: TC_001_Add_New_User


        Background:  Application Launch
              And   User opens the browser and enter url

        Scenario: Verify Functionality to Add New Userand User Table

            Given User reads the TestCaseID "TC_001_Add_New_User"
             Then  User waits for "BtnAddUser" to get displayed
              And  User clicks on "BtnAddUser"
             Then User enters "firstName" in "TxtFirstName"
             Then User clicks on "BtnCompany" button
             Then User enters "username" in "TxtUserName"
             Then User switches to frame with name or index "1"
             Then User enters "password" in "TxtPassword"
             Then User enters "lastName" in "TxtLastName"
             Then User selects the dropdown "BtnRole" and value as "role"
             Then User clicks on "BtnCompany" button
             Then User enters "email" in "TxtEmail"
             Then User enters "mobile" in "TxtMobileNumber"


        # Scenario: Verify Functionality to Add New Userand User Table

        #     Given User reads the TestCaseID "TC_001_Add_New_User"
        #       And   User opens the browser and enter url
        #      Then  User verifies the title "" of the page
        #      Then  User waits for "BtnAddUser" to get displayed
        #       And  User clicks on "BtnAddUser"
        #      Then User enters "Sumit" in "TxtFirstName"
        #      Then User enters "Saxena" in "TxtLastName"
        #      Then User enters "Sumit" in "TxtUserName"
        #      Then User enters "Sumit" in "TxtPassword"
        #      Then User selects the dropdown "BtnRole" and value as "Admin"
        #      Then User clicks on "BtnCompany" button
        #      Then User enters "Sumit" in "TxtEmail"
        #      Then User enters "Sumit" in "TxtMobileNumber"

                   




