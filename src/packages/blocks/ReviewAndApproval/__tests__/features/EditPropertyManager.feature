Feature: PropertyManagerDetails

    Scenario: User navigates to EditPropertyManager
        Given I am a User loading EditPropertyManager
        When I navigate to the EditPropertyManager
        Then EditPropertyManager will load with out errors
        And Should go back to property manager details
        And Should edit the property manager
        And Should load the property manager details
        And Should open add property modal
        And Should close add property modal
        And Should load property list
        And Should open the edit property modal
        And Should delete the property
        And Should load the ID type list
        And Should add the property for property manager
        And Should edit the property for property manager
        And Should check property manager available for unit
        And Should call the unit api when building change