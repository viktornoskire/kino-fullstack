# Install

1. npm install.
2. npm run dev.

### --OR--

1. npm install.
2. npm run build.
3. npm start.

# Other instructions

Here we can put other instuctions if needed.

# VG-Assignment for each member to explain their reasoning.

In this section, each member of this project will have the chance to explain their choices for their VG-assignments.

## Rikard

### The reason why i chose to use MUI (Material UI).

1. There are several companies here in the north of Sweden that i know uses tailwind & MUI. There are also companies iam intrested in to work for in the future. Using both MUI & Tailwind therefore makes good relevance for my future chances of landing a job.
2. MUI made it really easy to achieve a clean and modern design with relatively little effort. By utilizing the theme we already had, and creating the same theme for MUI, I could easily make steps 1–3 look similar to the Tailwind design. In fact, I think MUI made the design even better here than my own version using Tailwind.
3. Now to some challenges I experienced with MUI. I find the code a lot harder to read when using MUI compared to Tailwind or plain CSS. While Tailwind also styles components inline, the way it’s structured in MUI makes it harder for me to follow. This could of course just be a matter of getting used to the syntax and structure, but as a new developer, it made things more difficult.
4. Initially when setting up MUI, I had some problems with Grid2 and Grid. I tried using Grid for layout but kept getting errors. From what I could understand, MUI recently introduced changes to the Grid component. To avoid further issues, I chose to use Box instead, which worked just fine.

### Summary

In summary, I think MUI is interesting because it makes the UI look really good with little effort. Even though there’s a learning curve, the way it delivers polished UI elements is satisfying. After using MUI, I also started to recognize the MUI "style" on many websites—which might be a downside if you’re aiming for a more unique or customized UI look.

## Johannes

Johannes writes here.

## Viktor

Viktor writes here.

## Louise

### Test strategy for member page for logged in member

I have chosen to create a e2e test for logged in members, with the purpose to test interaction with the member page.
The test checks if the visitor can log in to the site and get access to the member page.
The test checks that a session has been created, which is necessary to get access to the member page and information from the database.
The test checks that information about the member is accessed from the database and that it is displayed on the member page for the visitor.

### Instructions to the test

The be able to run the test a registered member must exist in the database. Then a cypress.env.json file must be created at the same level as the cypress.config.ts file. The file must consist of log in information for the registered member.
Add following information in the cypress.env.json file:
{
”USERNAME”: email for registered member
”PASSWORD”: password for registered member
}

To start the test type “npm run cypress” in the command prompt

## Emily

Deployed on Vercel: https://mock-cinema-xi.vercel.app/
