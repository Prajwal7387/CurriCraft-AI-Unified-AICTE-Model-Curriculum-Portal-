import { AuditLog, IAuditLog } from '../models';
import { logger } from '../config/logger';

/**
 * Audit service — logs all significant actions for security and compliance.
 */
export class AuditService {
  /**
   * Create an audit log entry.
   */
  async log(data: {
    userId: string;
    action: string;
    resource: string;
    resourceId?: string;
    details?: Record<string, any>;
    ipAddress?: string;
    userAgent?: string;
    statusCode?: number;
    method?: string;
    path?: string;
  }): Promise<IAuditLog> {
    try {
      const auditLog = await AuditLog.create(data);
      return auditLog;
    } catch (error) {
      logger.error('Failed to create audit log:', error);
      // Don't throw — audit log failure should not block operations
      return {} as IAuditLog;
    }
  }

  /**
   * Get audit logs with filters and pagination.
   */
  async getLogs(
    filters: Record<string, any>,
    page: number = 1,
    limit: number = 50
  ): Promise<{ logs: IAuditLog[]; total: number }> {
    const [logs, total] = await Promise.all([
      AuditLog.find(filters)
        .populate('userId', 'name email')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      AuditLog.countDocuments(filters).exec(),
    ]);

    return { logs, total };
  }
}

export const auditService = new AuditService();
