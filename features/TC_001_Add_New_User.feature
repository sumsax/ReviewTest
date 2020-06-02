@sanity
@TC_001_Add_New_User
Feature: TC_001_Add_New_User


        Background:  Application Launch
              And   User opens the browser and enter url

        # Scenario: Verify Functionality to Add New Userand User Table
        #     Given User reads the TestCaseID "TC_001_Add_New_User"
        #      Then  User waits for "BtnAddUser" to get displayed
        #       And  User clicks on "BtnAddUser"
        #      Then User enters "firstName" in "TxtFirstName"
        #      Then User enters "lastName" in "TxtLastName"
        #      Then User clicks on "BtnCompany" button
        #      Then User enters "password" in "TxtPassword"
        #      Then User enters "email" in "TxtEmail"
        #      Then User enters "mobile" in "TxtMobileNumber"
        #      Then User enters "username" in "TxtUserName"
         #    Then User selects the dropdown "BtnRole" and value as "role"
        #      Then User clicks on "BtnCompany" button


        Scenario: Verify Newly Added User in User Table and Close Functionality

            Given User reads the TestCaseID "TC_002_Add_New_User"
             Then User waits for "newAddedUserInfo" text to get displayed from element "newAddedUserInfo"
           #  And User waits for User "newAddedUserFistName" name "firstName" to get displayed in User Table
              And  User clicks on "IcondeleteUser"
              And  User clicks on "BtnDeleteUserOK"
             # And User waits for "" text to get displayed from element "firstName"


            

                   




