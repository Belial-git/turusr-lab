<?php

namespace App\Controller;

use App\Entity\Task;
use App\Repository\TaskRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/task')]
class TaskController extends AbstractController
{
    #[Route('/', name: 'get_task', methods: "GET")]
    public function getTasks(TaskRepository $repo): JsonResponse
    {
        $tasks = $repo->findAll();

        return $this->json([
            'message' => 'get all task',
            'data' => $tasks,
        ]);
    }

    #[Route('/', name: 'create_task', methods: "POST")]
    public function createTask(Request $request, TaskRepository $repo): JsonResponse
    {
        if (is_null($request->request->get('content', null))) return $this->json([
            'message' => 'no data',
        ], 400);

        $task = new Task();
        $task->setContent($request->request->get('content'));
        $task->setIsDone(false);

        $repo->save($task,true);

        return $this->json([
            'message' => 'task was created successfully',
            'data' => $task,
        ]);
    }

    #[Route('/{id}', name: 'edit_task', methods: "PUT")]
    public function editTask($id, Request $request, TaskRepository $repo): JsonResponse
    {
        $task = $repo->find($id);
        if (!$task instanceof Task) return $this->json([
            'message' => 'Task not found',
        ], 404);

        $data = json_decode($request->getContent(), true);

        if (array_key_exists('content', $data) && $data['content'] !== $task->getContent())
            $task->setContent($data['content']);
        if (array_key_exists('done', $data) && $data['done'] !== $task->IsDone())
            $task->setIsDone($data['done']);

        $repo->save($task,true);

        return $this->json([
            'message' => 'task was edited successfully',
            'data' => $task,
        ]);
    }
    #[Route('/{id}', name: 'delete_task', methods: "DELETE")]
    public function deleteTask($id, TaskRepository $repo): JsonResponse
    {
        $task = $repo->find($id);

        if ($task instanceof Task){
            $repo->remove($task,true);
        }

        return $this->json([
            'message' => 'task was deleted successfully',
        ]);
    }
}
