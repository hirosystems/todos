import React, { useState, useEffect } from 'react';
import { Flex, Box, Text } from '@blockstack/ui';
import { userSession } from '../auth';
import { Todo } from './Todo';
import { v4 as uuid } from 'uuid';
import { NoUsername, Sharer } from './Sharer';
import { fetchTasks, saveTasks } from '../storage';
import exportFromJSON from 'export-from-json';

export const TodoList = ({ username }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPublic, setIsPublic] = useState(false);
  const [usernameOfTodos, setUsernameOfTodos] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const name = document.location.pathname.split('/')[2];
    if (name) {
      setUsernameOfTodos(name);
    }
    const doFetchTasks = async () => {
      const response = await fetchTasks(userSession, name);
      if (response.tasks === null) {
        setNotFound(true);
      } else {
        setTasks(response.tasks);
      }
      setIsPublic(!!response.public);
      setLoading(false);
    };
    doFetchTasks();
  }, []);

  const saveTask = ({ value, complete, index, remove }) => {
    setTasks(currentTasks => {
      if (remove && index !== 0) {
        currentTasks.splice(index, 1);
        void saveTasks(userSession, currentTasks);
        return currentTasks;
      } else {
        const task = currentTasks[index];
        task.value = value;
        task.complete = complete;
        currentTasks[index] = task;
        void saveTasks(userSession, currentTasks);
        return currentTasks;
      }
    });
  };

  const createTask = () => {
    setTasks(tasks.concat([{ value: '', completed: false, id: uuid() }]));
  };

  const exportData = ({ exportType }) => {
    exportFromJSON({ data: tasks, fileName: 'todo', exportType: 'csv' });
  };

  const todos = tasks.map((task, index) => (
    <Todo
      {...task}
      index={index}
      key={task.id}
      save={saveTask}
      disabled={!!usernameOfTodos}
      create={createTask}
    />
  ));

  const getDownload = () => {
    if (loading) {
      return '';
    }
    return 'Export as CSV';
  };

  const getHeader = () => {
    if (loading) {
      return 'Loading...';
    }
    if (notFound) {
      return '404. No todos found here.';
    }
    if (usernameOfTodos) {
      if (isPublic) {
        return `${usernameOfTodos.split('.')[0]}'s todos`;
      }
      return `${usernameOfTodos.split('.')[0]}'s todos are private`;
    }
    return 'My todos';
  };

  return (
    <Flex>
      <Box maxWidth="660px" width="100%" mx="auto" mt="75px">
        <Flex width="100%" flexWrap="wrap">
          <Box mb={4} width="100%">
            <Text textStyle="display.large" fontSize={7}>
              {getHeader()}
            </Text>
          </Box>
          <Text cursor="pointer" fontSize={1} color="blue" fontWeight="500" onClick={exportData}>
            {getDownload()}
          </Text>
          {!loading && !usernameOfTodos && (
            <>
              {username && (
                <Sharer
                  username={username}
                  isPublic={isPublic}
                  togglePublic={() => {
                    void saveTasks(userSession, tasks, !isPublic);
                    setIsPublic(!isPublic);
                  }}
                />
              )}
              <NoUsername />
            </>
          )}
          {loading ? <Text>loading...</Text> : todos}
        </Flex>
      </Box>
    </Flex>
  );
};
