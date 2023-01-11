Feature: TenantProfile

    Scenario: User navigates to TenantProfile
        Given I am a User loading TenantProfile
        When I navigate to the TenantProfile
        Then TenantProfile will load with out errors
        And Should go back to my unit details page
        And Should load profile details