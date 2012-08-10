@announce
Feature: Running sciime
  Scenario: User runs sciime
    When I run `sciime`
    Then the output from "sciime" should contain "Listening on 127.0.0.1:9876"

  Scenario: User runs sciime with port option
    When I run `sciime -p 6789`
    Then the output from "sciime -p 6789" should contain "Listening on 127.0.0.1:6789"

  Scenario: User runs sciime with host option
    When I run `sciime -h 0.0.0.0`
    Then the output from "sciime -h 0.0.0.0" should contain "Listening on 0.0.0.0:9876"

  Scenario: User runs sciime with host and port option
    When I run `sciime -h 0.0.0.0 -p 6789`
    Then the output from "sciime -h 0.0.0.0 -p 6789" should contain "Listening on 0.0.0.0:6789"

  Scenario: User runs sciime with help option
    When I run `sciime --help`
    Then the output from "sciime --help" should contain "--help                       Display this screen"
