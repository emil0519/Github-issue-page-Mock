# 簡介 / Introduction

這個專案以React & Typesccript復刻了Github Issue Page大部分的功能，包括串Github 的Oauth 會員登入系統、串接Github Issue Page的CRUD api及HTML Editor。

In this React/Typescript web app, I mocked Github Issue Page, perserving most of it's features.  Highlighting the Github Oauth signin mechanism supported by superbase. A issue list that connect to Github API for CRUD features, and HTML Editor.

# 聯繫方式 / Contacts

我正在各地尋找新的工作，如有任何指教，請不吝致電或Whatsapp(886)0901-055-121，[或來函至 r09343018@ntu.edu.tw 賜教](mailto:r09343018@ntu.edu.tw)。

I am actively looking for job opportunities around the world, please don't heistate to contact me through Whatsapp or directly dial (886)0901-055-121, or [send me an email](mailto:r09343018@ntu.edu.tw)

## 目前功能 / Current Features

- 串接Github Oauth會員登入系統，選用superbase作為後端會員系統替代品，來串接特定用戶的issue列表
- 切版及實作Issue Page 列表的邏輯，能夠以搜尋、Issue狀態（open/closed)或根據Author、Label、Assignee等方式來篩選顯示的Issue。
- 新增Issue Page，以HTML Editor新增Issue Page並與Assignee、Labels等功能連動，支援多選選單功能
- 編輯時，利用Reusable component帶入API資訊

- Implement member system through superbase and connect to your personal Github account, with official access token, this web app links to your own issue page and perform CRUD features.
- Perform website slicing with accuracy to pixel and implement logics in Issue Page. User can search, categorize the issues through its status (open/closed) or categorize according to author, label and assignees.
- Through reusabale component, allows user to create and edit their own issues, with dropdown menu featuring multiple selections.

## 研究中 / Upcoming features

- 以Node.js 及 SQL 建立資料庫來實作會員系統，並探索如何對密碼進行資料加密
- 以Node.js 實作後端CRUD功能及在後端檢核資料
- 以React hook form 實作前端檢核
- 以GCP部署網站，了解cicd及deploy流程

- Implement database and membership system through Node.js & SQL, explore methods of password encryption
- Provide CRUD apis and data validation through node.js
- Implement data validatoin in frontend through React hook form
- Deploy the app through GCP and walk through the cicd prcoess and concepts