export function calculatePositions(originalTasks) {
    let tasks
    if(originalTasks.tasks){
       tasks = originalTasks.tasks.map(task => JSON.parse(JSON.stringify(task)));
    }else{
      tasks = originalTasks.map(task => JSON.parse(JSON.stringify(task)));
    }
    tasks.sort((a, b) => a.start - b.start);
  
    tasks.forEach(task => {
      task.left = 46;
      task.overlap = false;
    });
  
    for (let i = 0; i < tasks.length; i++) {
      for (let j = i + 1; j < tasks.length; j++) {
        if (tasks[i].start < tasks[j].start + tasks[j].duration && tasks[i].start + tasks[i].duration > tasks[j].start) {
          tasks[i].overlap = tasks[j].overlap = true;
  
          if (tasks[i].duration === tasks[j].duration) {
            if (tasks[i].start < tasks[j].start) {
              tasks[i].left = Math.max(tasks[i].left, tasks[j].left + 100);
            } else {
              tasks[j].left = Math.max(tasks[j].left, tasks[i].left + 100);
            }
          } else {
            if (tasks[i].duration < tasks[j].duration) {
              tasks[i].left += 100;
            } else {
              tasks[j].left += 100;
            }
          }
        }
      }
    }
  
    return tasks;
  }