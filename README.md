<div align="center"><a name="readme-top"></a>

[![][image-banner]][website-link]

# Plux Market DB Connector

Plux Market works for rAthena emulator. It is a web application that lets players search for items by name or ID to find sellers and prices. It provides statistics like average prices, recent sales, and a 30-day price trend graph, helping players make informed buying and selling decisions.

## What is the Plux Market DB Connector?

The Plux Market DB Connector is a serverless API built in Next.Js that connects to your rAthena MySQL database to fetch the data needed for the Plux Market web application. It helps as a proxy between the Web Application and the MySQL database.

</div>

![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)

## Getting started

1. One-click deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fx0NaN0x%2Fplux-market-db-connector&env=MYSQL_HOST,MYSQL_PORT,MYSQL_DATABASE,MYSQL_USER,MYSQL_PASSWORD,API_SECRET_TOKEN)

2. (Recommended) Create a MySQL user specifically for this connector with READ only permissions on the following tables. To do that, follow the commands below:

- Change `databaseName` to your database name.
- Change `strongPassword` to a strong password.

```
-- Drop the existing user
DROP USER 'pluxmarketconnector'@'%';

-- Step 1: Create the user
CREATE USER 'pluxmarketconnector'@'%' IDENTIFIED BY 'strongPassword';

-- Step 2: Grant permissions to the specified tables
GRANT SELECT ON `databaseName`.vendings TO 'pluxmarketconnector'@'%';
GRANT SELECT ON `databaseName`.vending_items TO 'pluxmarketconnector'@'%';
GRANT SELECT ON `databaseName`.cart_inventory TO 'pluxmarketconnector'@'%';
GRANT SELECT ON `databaseName`.char TO 'pluxmarketconnector'@'%';
GRANT SELECT ON `databaseName`.item_db TO 'pluxmarketconnector'@'%';

-- Step 3: Flush the privileges
FLUSH PRIVILEGES;

```

3. Fill in the environmental variables needed in Vercel for the application to work.

- Share both the `API_SECRET_TOKEN` and the `URL` of this deployment with the Plux Market Web Application to authenticate the requests.

4. Done! The api endpoint should be available at `https://[url]/api/executeQuery`.

## Plux Market Features

### General Features

- Listing 100 random items on the startpage
- Searching item by name or id. Name doesn't need to be complete.
- Dark/Light mode adapting to system preferences.
- Responsive design for mobile and desktop
- Fetching metadata of each item when it's clicked
- Show map where the seller is. Click on the location will save `/navi [coordinates]` on clipboard, so it can be pasted in game.
- Show different colors based on price.
- Show refine rate of item in the name
- Show slots of item in the name
- Show card(s) name attached to the item
- Show forged elemental status and name of item (Very Very)
- Sort the table by Price
- Add pagination on the table to show 10 items per page
- Support to share a searched page link (if people want to share the url to another friend)
- Items not being sold can still be searched and see their statistics
- It's way faster than Flux CP

### Statistics Features

- See item statistics (needs custom code on rAthena)
  - Amount of items sold
  - Average price of the item
  - Last timestamp when the item was sold
  - See a graph of the last 30 days of the price development of the item
- Show last item sold
- Show most popular item of the week and compare it to previous week
- Show most expensive item sold on the week
- Show the total amount of zeny spent in the server per week & all time.

<!-- LINK GROUP -->

[website-link]: https://market.plux.dev
[image-banner]: https://market.plux.dev/images/og-image.png
