# Product Requirements Document: @srcube-taro/toast Component

## 1. Introduction

Developers often need to display temporary notifications to users, commonly known as "toasts". These are used to provide feedback on an action or to display system messages. This document outlines the requirements for a declarative `Toast` component that provides a simple, reusable, and "dumb" component for displaying these notifications.

This component will be controlled entirely by its props, making it a presentational component that can be easily integrated into any state management system or the future imperative API in the `@srcube-taro/app` package.

## 2. Goals

*   **Provide a Simple, Prop-Driven API:** The component should be easy to use and understand, with a clear and predictable set of props.
*   **Allow for Customizable Content and Styling:** The component should be flexible enough to allow for custom content and styling to match the application's design system.
*   **Be a "Dumb" Component:** The component should not have any internal state management for timers or complex interactions. Everything must be driven directly by the data fed into it.

## 3. Target Audience

*   **Persona:** Frontend & Full-Stack Developers
*   **Role:** Developers building mobile or web applications using the TaroJS framework.
*   **Needs & Pain Points:**
    *   They need a simple, reusable component to display temporary notifications.
    *   They want to avoid complex state management for simple UI elements.
    *   They want to ensure a consistent look and feel for notifications across their application.

## 4. Success Metrics

*   **High Adoption Rate:** The component is used for over 90% of all temporary notifications in new and refactored features.
*   **Positive Developer Feedback:** Developers find the API intuitive and easy to use, leading to positive comments and a high satisfaction score (e.g., 4.5/5).
*   **Easy Integration:** The component is easy to integrate into the future `@srcube-taro/app` provider for a global API.

## 5. Features and Requirements

### Feature 1: Presentational Toast
*   **Requirement 1.1:** The component renders a `Toast` view. Its visibility is controlled entirely by the parent component (i.e., the parent decides when to render it).
*   **Requirement 1.2:** It accepts `children` to display any content passed to it.
*   **Requirement 1.3:** It accepts an `onClose` prop, which is a callback function that gets triggered when the user clicks the close button.
*   **Requirement 1.4:** It accepts a `status` prop (e.g., `success`, `error`, `warning`, `info`) to apply basic styling and a corresponding icon.
*   **Requirement 1.5:** It accepts a `placement` prop (e.g., `top`, `bottom`) to apply positioning styles.

## 6. Out of Scope

*   **Imperative API:** No global `toast.show()` functions. This functionality will be built in the `@srcube-taro/app` package by using this declarative `Toast` component.
*   **Automatic Dismissal:** There will be no `duration` prop or internal timers. The parent component is responsible for deciding when to stop rendering the toast.
*   **Stacking:** The component will have no logic for stacking or managing multiple instances. The `@srcube-taro/app` provider will be responsible for rendering and stacking multiple toasts.
*   **Internal State:** The component will not manage its own visibility or state.
