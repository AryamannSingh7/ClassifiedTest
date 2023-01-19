Feature: TenantList

    Scenario: User navigates to TenantList
        Given I am a User loading TenantList
        When I navigate to the TenantList
        Then TenantList will load with out errors
        And Should load the my tenant list
        And Should delete my tenant for the unit