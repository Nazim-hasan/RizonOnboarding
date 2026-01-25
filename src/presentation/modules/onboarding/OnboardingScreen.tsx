import React, { useMemo } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MockOnboardingRepository } from '../../../data/repositories/MockOnboardingRepository';
import { GetOnboardingStatusUseCase } from '../../../domain/usecases/GetOnboardingStatusUseCase';
import { SubmitFeedbackUseCase } from '../../../domain/usecases/SubmitFeedbackUseCase';
import { useOnboardingController } from './controllers/useOnboardingController';
import { OnboardingSuccessView } from './views/OnboardingSuccessView';
import { FeedbackView } from './views/FeedbackView';
import { AppStoreView } from './views/AppStoreView';

export const OnboardingScreen = () => {
  // Dependency Injection
  const repository = useMemo(() => new MockOnboardingRepository(), []);
  const getStatusUseCase = useMemo(() => new GetOnboardingStatusUseCase(repository), [repository]);
  const submitFeedbackUseCase = useMemo(() => new SubmitFeedbackUseCase(repository), [repository]);
  
  const { 
    step, 
    isLoading, 
    onNegativeFeedback, 
    onPositiveFeedback,
    submitFeedback,
    closeFeedback,
    handleReview,
    closeAppStore,
    onSuccessSheetHide,
    openOnboarding
  } = useOnboardingController(getStatusUseCase, submitFeedbackUseCase);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Background Dashboard UI (Light Theme) */}
      <View style={styles.header}>
        <View style={styles.avatar} />
        <Text style={styles.greeting}>Good evening, Alex</Text>
      </View>
      
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>$12,450.00</Text>
        <View style={styles.tag}>
          <Text style={styles.tagText}>+2.4%</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {[1, 2, 3].map((i) => (
          <View key={i} style={styles.transactionRow}>
            <View style={styles.transactionIcon} />
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Payment Received</Text>
              <Text style={styles.transactionDate}>Today, 12:4{i} PM</Text>
            </View>
            <Text style={styles.transactionAmount}>+$120.00</Text>
          </View>
        ))}
      </View>

      {/* Floating Action Button to Reopen Modal */}
      <TouchableOpacity style={styles.fab} onPress={openOnboarding} activeOpacity={0.8}>
        <Text style={styles.fabIcon}>✨</Text>
      </TouchableOpacity>

      {/* Modals */}
      <OnboardingSuccessView 
        isVisible={step === 'success'}
        onNegative={onNegativeFeedback}
        onPositive={onPositiveFeedback}
        onModalHide={onSuccessSheetHide}
      />
      
      <FeedbackView
        isVisible={step === 'feedback'}
        onClose={closeFeedback}
        onSubmit={submitFeedback}
      />

      <AppStoreView
        isVisible={step === 'appstore'}
        onClose={closeAppStore}
        onReview={handleReview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Light Background
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E9ECEF',
    marginRight: 12,
  },
  greeting: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Helvetica',
    fontWeight: '600',
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 24,
    marginBottom: 30,
    // Add shadow for depth in light mode
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  balanceLabel: {
    color: '#868E96',
    fontSize: 14,
    marginBottom: 8,
    fontFamily: 'Helvetica',
  },
  balanceAmount: {
    color: '#000',
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 16,
    fontFamily: 'Helvetica',
  },
  tag: {
    backgroundColor: '#E7F5FF', // Light blue tint
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  tagText: {
    color: '#228BE6',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    flex: 1,
  },
  sectionTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    fontFamily: 'Helvetica',
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F5',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F3F5',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    color: '#000',
    fontSize: 16,
    marginBottom: 4,
    fontFamily: 'Helvetica',
  },
  transactionDate: {
    color: '#868E96',
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  transactionAmount: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Helvetica',
  },
  fab: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 100,
  },
  fabIcon: {
    fontSize: 24,
  }
});
