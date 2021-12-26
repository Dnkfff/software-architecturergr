# software-architecture-4

### Щоб запустити лабораторну роботу №4, вам необхідно мати встановлену останню версію LTS Node.js

#### Щоб запустити виконання програми введіть команду з корінної директорії проекту: npm run start

Чому залежність часу виконання програми від кількості вхідних данних вийшла нелінійною?
Причина у тому, що кожна з команд сама по собі залежить від алгоритму виконання циклу подій.
Вона має записатись у свою чергу. У певний період прочитатись, виконатись за допомогою функції та вивести результат у консоль.
Тому вона залежить від декількох параметрів, що зі збільшенням параметрів буде непропорційно змінювати час виконання програми.

Результати експериментних замірів:
![screen 1](https://github.com/ddynikov/software-architecturergr/blob/lab4_task/assets/1.jpg)
![screen 2](https://github.com/ddynikov/software-architecturergr/blob/lab4_task/assets/2.jpg)
![screen 3](https://github.com/ddynikov/software-architecturergr/blob/lab4_task/assets/3.jpg)
![screen 4](https://github.com/ddynikov/software-architecturergr/blob/lab4_task/assets/4.jpg)
![screen 5](https://github.com/ddynikov/software-architecturergr/blob/lab4_task/assets/5.jpg)
![screen 6](https://github.com/ddynikov/software-architecturergr/blob/lab4_task/assets/6.jpg)
![screen 7](https://github.com/ddynikov/software-architecturergr/blob/lab4_task/assets/7.jpg)
![screen 8](https://github.com/ddynikov/software-architecturergr/blob/lab4_task/assets/8.jpg)
![screen 9](https://github.com/ddynikov/software-architecturergr/blob/lab4_task/assets/9.jpg)
![screen 10](https://github.com/ddynikov/software-architecturergr/blob/lab4_task/assets/10.jpg)
![screen 11](https://github.com/ddynikov/software-architecturergr/blob/lab4_task/assets/11.jpg)
![screen 12](https://github.com/ddynikov/software-architecturergr/blob/lab4_task/assets/12.jpg)
![screen 13](https://github.com/ddynikov/software-architecturergr/blob/lab4_task/assets/13.jpg)
![screen 14](https://github.com/ddynikov/software-architecturergr/blob/lab4_task/assets/14.jpg)
![screen 15](https://github.com/ddynikov/software-architecturergr/blob/lab4_task/assets/15.jpg)
![screen 16](https://github.com/ddynikov/software-architecturergr/blob/lab4_task/assets/16.jpg)
Графік:
![graph](https://github.com/ddynikov/software-architecturergr/blob/lab4_task/assets/17.jpg)
Діаграму взаємодії:
![diagram](https://github.com/ddynikov/software-architecturergr/blob/lab4_task/assets/%D0%B4%D1%96%D0%B0%D0%B3%D1%80%D0%B0%D0%BC%D0%B0%20%D0%B2%D0%B7%D0%B0%D1%94%D0%BC%D0%BE%D0%B4%D1%96%D1%97.png)
