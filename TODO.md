Update profile page to allow users to add their company/role
Allow users to post issues / bugs that they're facing
Let users comment on issues
Let users upvote on comments, reply to them.

TABLES

Text: use nvarchar (unicode, many languages)

 - Users
    - UID
    - email
    - given_name
    - family_name
    - nickname
    - company
    - role

 - Issues
    - user UID
    - issue UID
    - Date / Time posted at
    - Issue text
    - number of upvotes
    - number of downvotes

- Comments
    - user UID
    - issue UID
    - Date / Time posted at
    - Comment text
    - number of upvotes
    - number of downvotes