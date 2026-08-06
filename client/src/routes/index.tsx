import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';

import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { VerifyEmailPage } from '@/pages/auth/VerifyEmailPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage';
import { LandingPage } from '@/pages/landing/LandingPage';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { AdminUserManagementPage } from '@/pages/admin/AdminUserManagementPage';
import { BureauExpertsPage } from '@/pages/bureau/BureauExpertsPage';
import { CurriculumWorkspacePage } from '@/pages/workspace/CurriculumWorkspacePage';
import { VersionControlPage } from '@/pages/version/VersionControlPage';
import { AiAssistantPage } from '@/pages/ai/AiAssistantPage';
import { NepCompliancePage } from '@/pages/nep/NepCompliancePage';
import { ResourceHubPage } from '@/pages/resources/ResourceHubPage';
import { AnalyticsPage } from '@/pages/analytics/AnalyticsPage';
import { ApprovalWorkflowPage } from '@/pages/workflow/ApprovalWorkflowPage';
import { PublicPortalPage } from '@/pages/portal/PublicPortalPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Landing & Auth Routes */}
      <Route path="/" element={<LandingPage />} />

      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>
      </Route>

      {/* Protected Main App Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin/users" element={<AdminUserManagementPage />} />
          <Route path="/bureau/experts" element={<BureauExpertsPage />} />
          <Route path="/workspace" element={<CurriculumWorkspacePage />} />
          <Route path="/versions" element={<VersionControlPage />} />
          <Route path="/ai-assistant" element={<AiAssistantPage />} />
          <Route path="/nep-compliance" element={<NepCompliancePage />} />
          <Route path="/resources" element={<ResourceHubPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/workflows" element={<ApprovalWorkflowPage />} />
          <Route path="/portal" element={<PublicPortalPage />} />
        </Route>
      </Route>

      {/* Default Redirection */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
