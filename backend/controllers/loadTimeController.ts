import { Request, Response } from "express";
import axios from "axios";

// Функция для обработки запроса на измерение времени загрузки сайта
const loadTime = async (req: Request, res: Response) => {
  // Извлекаем URL из тела запроса
  const { url } = req.body;

  try {
    // Засекаем время начала загрузки
    const startTime = Date.now();
    // Выполняем GET-запрос к указанному URL
    await axios.get(url);
    // Засекаем время окончания загрузки
    const endTime = Date.now();
    // Вычисляем затраченное время
    const elapsedTime = endTime - startTime;

    // Выводим в консоль время загрузки
    console.log(`Время загрузки сайта ${url}: ${elapsedTime} мс`);

    // Отправляем успешный ответ с временем загрузки
    res.status(200).json({ time: elapsedTime });
  } catch (error) {
    // В случае ошибки выводим сообщение в консоль и отправляем статус 500
    console.error("Произошла ошибка при загрузке сайта:", error);
    res.status(500).json({ error: "Произошла ошибка при загрузке сайта" });
  }
};

// Экспортируем функцию loadTime как метод контроллера
export default {
  loadTime,
};
