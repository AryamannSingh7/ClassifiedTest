Feature: RegisterTenant

    Scenario: User navigates to RegisterTenant
        Given I am a User loading RegisterTenant
        When I navigate to the RegisterTenant
        Then RegisterTenant will load with out errors
        And Should load the building list
        And Should load the Id type list
        And Should load the unit list when building select
        And Should check tenant exist for selected unit
        And Should select tenant type
        And Should change tenant name
        And Should select the country code
        And Should change the phone number
        And Should change the email
        And Should select the id type
        And Should change the id number
        And Should change the id expiry date
        And Should upload the id card file
        And Should upload the other document files
        And Should remove the id card file
        And Should remove the other document files
        And Should change the page when submit the form

    Scenario: Contract page
        Given I am a User loading RegisterTenant
        Then RegisterTenant will load with out errors
        And Should go back to register tenant page
        And Should remove contract
        And Should submit tenant for contract
        And Should load the tenant details
        And Should upload the contract
        And Should issue the contract now
        And Should issue the contract later