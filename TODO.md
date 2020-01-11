Make issues show on profile
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
    - Date created
    - Time created

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