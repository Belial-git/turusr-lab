<?php

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.

if (\class_exists(\ContainerV1C6QbI\App_KernelDevDebugContainer::class, false)) {
    // no-op
} elseif (!include __DIR__.'/ContainerV1C6QbI/App_KernelDevDebugContainer.php') {
    touch(__DIR__.'/ContainerV1C6QbI.legacy');

    return;
}

if (!\class_exists(App_KernelDevDebugContainer::class, false)) {
    \class_alias(\ContainerV1C6QbI\App_KernelDevDebugContainer::class, App_KernelDevDebugContainer::class, false);
}

return new \ContainerV1C6QbI\App_KernelDevDebugContainer([
    'container.build_hash' => 'V1C6QbI',
    'container.build_id' => 'f75f11ce',
    'container.build_time' => 1674539812,
], __DIR__.\DIRECTORY_SEPARATOR.'ContainerV1C6QbI');