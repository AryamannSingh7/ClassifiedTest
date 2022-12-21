Feature: RegisterPropertyManager

    Scenario: User navigates to RegisterPropertyManager
        Given I am a User loading RegisterPropertyManager
        When I navigate to the RegisterPropertyManager
        Then RegisterPropertyManager will load with out errors
        And Should open the edit modal
        And Should delete the property at local level
        And Should open add property modal
        And Should close add property modal
        And Should load the ID type list
        And Should register the property manager

    Scenario: Add And Edit Property 
        Given I am a User loading RegisterPropertyManager
        When I navigate to the RegisterPropertyManager
        Then Should load the building list
        Then Should load the unit list
        Then Should load complex details
        Then Should call the unit api when building change
        Then Should check property manager available for unit
        Then Should add the property
        Then Should edit the property