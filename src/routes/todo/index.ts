import { FastifyPluginAsync } from "fastify";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

let todos: Todo[] = [];

const todo: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    return todos;
  });
  fastify.post<{ Body: Todo }>("/", async function (request, reply) {
    const todo: Todo = {
      ...request.body,
      id: todos.length + 1,
    };
    todos.push(todo);
    return todo;
  });

  fastify.put<{ Body: Todo }>("/", async function (request, reply) {
    const todo: Todo = request.body;
    todos = todos.map((t) => (t.id === todo.id ? todo : t));

    return todo;
  });

  fastify.delete<{ Params: { id: number } }>(
    "/",
    async function (request, reply) {
      const { id } = request.params;
      todos = todos.filter((t) => t.id !== id);
      return { id };
    }
  );
};

export default todo;
