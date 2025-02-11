# EducaIA Frontend Documentation

## Overview

This document provides a detailed overview of the frontend components and screens of the EducaIA application.

## Table of Contents

- [App](#app)
- [Pages](#pages)
  - [Index](#index)
  - [Analysis](#analysis)
  - [Resources](#resources)
  - [Reports](#reports)
  - [Profile](#profile)
  - [Login](#login)
  - [Register](#register)
  - [Forgot Password](#forgot-password)
  - [Not Found](#not-found)
- [Layout Components](#layout-components)
  - [Navbar](#navbar)
  - [Sidebar](#sidebar)
- [Dashboard Components](#dashboard-components)
  - [MetricCard](#metriccard)
  - [QuickActions](#quickactions)
  - [GradeDistributionChart](#gradedistributionchart)
  - [GradeTrendChart](#gradetrendchart)
  - [StudentProgressChart](#studentprogresschart)
- [UI Components](#ui-components)

## App

### `src/App.tsx`

The main application component. It sets up the routing using `react-router-dom` and provides context using `QueryClientProvider` and `TooltipProvider`.

**Functionality:**

- Defines routes for all the pages in the application.
- Provides a `QueryClient` for managing data fetching and caching.
- Provides a `TooltipProvider` for consistent tooltips throughout the application.

## Pages

### Index

#### `src/pages/index.tsx`

The dashboard page, serving as the main landing page for the application.

**Functionality:**

- Displays key metrics related to the professor's classes, providing a quick overview of the current status.
- Provides quick actions for common tasks, allowing the professor to easily access frequently used functions.
- Displays a welcome message to greet the professor upon login.

**Components:**

- `Navbar`: Provides navigation to other pages in the application.
- `MetricCard`: Displays a single key metric with a title, value, and icon. It is used to display the total number of students, active courses, pending reviews, and class average.
- `QuickActions`: Provides a set of quick action buttons for common tasks such as uploading exams, creating new classes, and accessing resources.

### Analysis

#### `src/pages/analysis.tsx`

The analysis page, which displays performance analysis data.

**Functionality:**

- Displays performance analysis data using tabs for Overview, Subjects, and Students, allowing users to view different aspects of student performance.
- Includes charts for Academic Performance Trend, Grade Distribution, and Performance by Subject, providing visual representations of the data.
- Includes tables for Subject Analysis and Student Analysis, presenting detailed information in a structured format.

**Components:**

- `Navbar`: Provides navigation to other pages in the application.
- `Tabs`: Provides a tabbed interface for navigating between different views of the analysis data (Overview, Subjects, and Students).
  - `TabsList`: Renders the list of tabs.
  - `TabsTrigger`: Renders a single tab trigger.
  - `TabsContent`: Renders the content for a single tab.
- `Card`: Provides a container for displaying information in a visually appealing way.
- `LineChart`, `BarChart`, `PieChart`: Used to display charts for visualizing performance data.
- `Table`: Used to display data in a tabular format.
  - `TableHeader`: Renders the table header.
  - `TableBody`: Renders the table body.
  - `TableRow`: Renders a single table row.
  - `TableHead`: Renders a table header cell.
  - `TableCell`: Renders a table data cell.

### Resources

#### `src/pages/resources.tsx`

The resources page, which displays a library of educational resources.

**Functionality:**

- Displays a library of educational resources using tabs for All Resources, Documents, Videos, Audio, and Presentations, allowing users to easily browse different types of resources.
- Includes search functionality to find resources by title, author, or topic, enabling users to quickly locate specific resources.
- Includes filters and categories to refine the resource list, allowing users to narrow down the results based on specific criteria.
- Includes upload functionality to add new resources, allowing users to contribute to the library.
- Includes download and bookmark functionality for each resource, allowing users to save resources for later use.

**Components:**

- `Navbar`: Provides navigation to other pages in the application.
- `Tabs`: Provides a tabbed interface for navigating between different resource categories (All Resources, Documents, Videos, Audio, and Presentations).
  - `TabsList`: Renders the list of tabs.
  - `TabsTrigger`: Renders a single tab trigger.
  - `TabsContent`: Renders the content for a single tab.
- `Input`: Provides a text input field for searching resources.
- `Button`: Provides buttons for filtering, categorizing, and uploading resources.
- `Card`: Provides a container for displaying resource information.
  - `CardContent`: Renders the content of a resource card.
- `lucide-react` icons: Used to visually represent different resource types and actions.

### Reports

#### `src/pages/reports.tsx`

The reports page, which allows users to generate and schedule reports.

**Functionality:**

- Allows users to generate and schedule reports on student performance and class progress, providing insights into various aspects of the educational process.
- Includes report categories such as Academic Performance, Engagement & Participation, and Administrative Reports, allowing users to focus on specific areas of interest.
- Includes options to customize reports by period, class, subject, and student, enabling users to generate reports tailored to their specific needs.
- Includes options to export reports in PDF, DOCX, XLSX, and CSV formats, allowing users to easily share and analyze the data.
- Includes options to schedule report generation and delivery, automating the reporting process.

**Components:**

- `Navbar`: Provides navigation to other pages in the application.
- `Card`: Provides a container for displaying report categories, customization options, and scheduling options.
  - `CardHeader`: Renders the header of a card.
  - `CardTitle`: Renders the title of a card.
  - `CardDescription`: Renders the description of a card.
  - `CardContent`: Renders the content of a card.
- `ReportCategory`: Displays a category of reports with a list of available reports.
- `ReportItem`: Displays a single report item that can be selected to generate a report.
- `select`: Used to select options for customizing reports.
- `button`: Used to trigger report generation, export, and scheduling actions.

### Profile

#### `src/pages/Profile.tsx`

The profile page, which allows users to manage their profile information and settings.

**Functionality:**

- Allows users to manage their profile information and settings, providing a centralized location for managing their account.
- Includes sections for Personal Information, Account Settings, Integrations, and User Actions, organizing the profile management options into logical categories.
- Includes options to view and edit personal information such as full name, username, email, and biography, allowing users to keep their profile up-to-date.
- Includes options to change password, enable two-factor authentication, manage devices, and configure notification settings, providing users with control over their account security and preferences.
- Includes options to connect to other services such as Google and Facebook, allowing users to integrate their account with other platforms.
- Includes options to save changes, cancel, delete account, and logout, providing users with the ability to manage their account actions.

**Components:**

- `Navbar`: Provides navigation to other pages in the application.
- `Card`: Provides a container for displaying profile information and settings.
  - `CardHeader`: Renders the header of a card.
  - `CardTitle`: Renders the title of a card.
  - `CardDescription`: Renders the description of a card.
  - `CardContent`: Renders the content of a card.
- `Input`: Provides input fields for editing personal information and account settings.
- `Label`: Provides labels for input fields and settings.
- `Switch`: Provides a toggle switch for enabling or disabling settings such as two-factor authentication and email notifications.
- `Button`: Provides buttons for performing actions such as saving changes, connecting to other services, and deleting the account.

### Login

#### `src/pages/LoginPage.tsx`

The login page, which allows users to log in to the application.

**Functionality:**

- Allows users to log in to the application by entering their username and password, providing access to the application's features.
- Includes a link to the "Forgot Password" page, allowing users to reset their password if they have forgotten it.
- Includes a link to the "Register" page, allowing new users to create an account.
- Performs basic validation to check for correct username and password, providing feedback to the user if the credentials are invalid.

**Components:**

- `Input`: Provides input fields for entering the username and password.
- `Label`: Provides labels for the input fields.
- `Button`: Provides a button for submitting the login form.
- `Link`: Provides links to the "Forgot Password" and "Register" pages.

### Register

#### `src/pages/RegisterPage.tsx`

The register page, which allows new users to register for the application.

**Functionality:**

- Allows new users to register for the application by entering their username, email, password, and confirm password, creating a new account in the system.
- Includes a link to the "Login" page, allowing users to navigate to the login page if they already have an account.
- Includes validation to ensure all fields are filled, the email format is valid, and the passwords match, providing feedback to the user if there are any errors in the input.

**Components:**

- `Input`: Provides input fields for entering the username, email, password, and confirm password.
- `Label`: Provides labels for the input fields.
- `Button`: Provides a button for submitting the registration form.
- `Link`: Provides a link to the "Login" page.

### Forgot Password

#### `src/pages/ForgotPasswordPage.tsx`

The forgot password page, which allows users to reset their password if they have forgotten it.

**Functionality:**

- Allows users to reset their password by entering their email address and requesting a password reset link, enabling them to regain access to their account.
- Includes validation to ensure the email field is not empty and the email format is valid, providing feedback to the user if the input is invalid.
- Displays a message to inform the user whether the password reset link was sent successfully or if an error occurred, providing feedback on the status of the request.
- Includes a link to return to the login page, allowing users to easily navigate back to the login page.

**Components:**

- `Input`: Provides an input field for entering the email address.
- `Label`: Provides a label for the email input field.
- `Button`: Provides a button for submitting the password reset request.
- `Link`: Provides a link to return to the login page.

### Not Found

#### `src/pages/NotFound.tsx`

The 404 Not Found page, which is displayed when the user attempts to access a non-existent route.

**Functionality:**

- Displays a 404 error message to indicate that the requested page was not found.
- Includes a link to return to the home page, allowing users to easily navigate back to the main page.
- Logs the attempted route to the console, providing developers with information about broken links or invalid URLs.

**Components:**

- `Link`: Provides a link to return to the home page.

## Layout Components

### Navbar

#### `src/components/layout/Navbar.tsx`

The navigation bar component.

**Functionality:**

- Provides links to all the main pages in the application.
- Highlights the current page.

### Sidebar

#### `src/components/layout/Sidebar.tsx`

The sidebar component, which provides additional navigation options.

**Functionality:**

- Provides additional navigation options to the Dashboard, Analysis, Resources, and Reports pages.
- It's a responsive sidebar that can be toggled on smaller screens.

## Dashboard Components

### MetricCard

#### `src/components/dashboard/MetricCard.tsx`

A component that displays a single metric with a title, value, and icon.

**Functionality:**

- Displays a metric with a title, value, and icon.
- Can display a trend indicator.

### QuickActions

#### `src/components/dashboard/QuickActions.tsx`

A component that provides quick access to common tasks.

**Functionality:**

- Provides quick access to common tasks such as uploading exams, creating new classes, accessing resources, and creating new content.

**Actions:**

- **Upload Exam:** Allows the user to upload an exam file (PDF, DOC, DOCX).
- **New Class:** Allows the user to create a new class.
- **Resources:** Opens the resource library.
- **Create:** Allows the user to create new educational content (assignment, quiz, material).

### GradeDistributionChart

#### `src/components/dashboard/GradeDistributionChart.tsx`

A component that displays a pie chart showing the distribution of grades in a class.

**Functionality:**

- Visualizes the distribution of grades in a class using a pie chart.

**Library:**

- `recharts`: Used for creating the pie chart.

**Data:**

- The chart displays the distribution of grades in the following categories: A (90-100%), B (80-89%), C (70-79%), D (60-69%), F (Below 60%).

### GradeTrendChart

#### `src/components/dashboard/GradeTrendChart.tsx`

A component that displays a line chart showing the trend of grades over time.

**Functionality:**

- Visualizes the trend of grades over time using a line chart.

**Library:**

- `recharts`: Used for creating the line chart.

**Data:**

- The chart displays the average grade for each month.

### StudentProgressChart

#### `src/components/dashboard/StudentProgressChart.tsx`

A component that displays a bar chart showing student progress in different courses.

**Functionality:**

- Visualizes student progress in different courses using a bar chart.

**Library:**

- `recharts`: Used for creating the bar chart.

**Data:**

- The chart displays the progress of students in different courses such as Math, Science, History, English, and Art.

## UI Components

The UI components are located in the `src/components/ui` directory. These components are reusable UI elements that are used throughout the application to maintain a consistent look and feel.

### Button

#### `src/components/ui/button.tsx`

A reusable button component with different variants and sizes.

**Functionality:**

- Provides a consistent button style throughout the application.
- Supports different variants such as default, destructive, outline, secondary, ghost, and link.
- Supports different sizes such as default, sm, lg, and icon.

**Library:**

- `class-variance-authority`: Used for managing different variants and sizes.
