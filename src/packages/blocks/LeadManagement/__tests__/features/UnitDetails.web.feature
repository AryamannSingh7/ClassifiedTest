Feature: UnitDetails

    Scenario: User navigates to UnitDetails
        Given I am a User loading UnitDetails
        When I navigate to the UnitDetails
        Then UnitDetails will load with out errors
        And Should load the unit details
        And Should load the relation list
        And Should load the id proof list
        And Should open the map modal
        And Should open the edit unit modal
        And Should open the slider image modal
        And Should close the slider modal
        And Should see the prev the slider modal
        And Should see the next the slider modal
        And Should close the map modal when click on close icon
        And Should close the delete member modal when click on close icon
        And Should close the delete member when click on Cancel button
        And Should delete family member
        And Should close the delink member modal when click on close icon
        And Should close the delink member when click on Cancel button
        And Should close the suspend member modal when click on close icon
        And Should close the suspend member when click on Cancel button
        And Should close the edit member modal when click on close icon
        And Should close the edit member when click on Cancel button
        And Should edit the family member
        And Should close the edit unit modal when click on close icon
        And Should close the edit unit when click on Cancel button
        And Should edit the unit