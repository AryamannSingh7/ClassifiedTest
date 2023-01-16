Feature: TenantDetails

    Scenario: User navigates to TenantDetails
        Given I am a User loading TenantDetails
        When I navigate to the TenantDetails
        Then TenantDetails will load with out errors
        And Should load the my tenant details
        And Should delete the my tenant
        And Should go to edit tenant page