Feature: EditTenant

    Scenario: User navigates to EditTenant
        Given I am a User loading EditTenant
        When I navigate to the EditTenant
        Then EditTenant will load with out errors
        And Should load tenant details for edit
        And Should select tenant type
        And Should change tenant name
        And Should select the country code
        And Should change the phone number
        And Should select the id type
        And Should change the id number
        And Should change the id expiry date
        And Should upload the id card file
        And Should upload the other document files
        And Should remove the id card file
        And Should remove the other document files
        And Should edit the my tenant