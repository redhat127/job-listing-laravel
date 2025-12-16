<?php

function getJobTypes()
{
    return ['full-time', 'part-time', 'contract', 'freelance', 'internship'];
}

function getJobStatus()
{
    return ['draft', 'active', 'expired'];
}

function getJobExperienceLevels()
{
    return ['entry', 'mid', 'senior', 'lead', 'executive'];
}

function getValidImageTypes()
{
    return [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/avif',
    ];
}
