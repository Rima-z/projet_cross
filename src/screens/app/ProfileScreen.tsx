import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'G'}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.name ?? 'Guest'}</Text>
          <Text style={styles.userEmail}>{user?.email ?? 'No email'}</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{user?.name ?? 'Guest'}</Text>
          </View>
          <View style={[styles.infoRow, { marginTop: 16 }]}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user?.email ?? '-'}</Text>
          </View>

          {user && (
            <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    paddingHorizontal: 24,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0D6B3B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#777777',
  },
  card: {
    marginTop: 8,
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#F7F8FA',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    color: '#777777',
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222222',
  },
  logoutBtn: {
    marginTop: 24,
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFE4E4',
  },
  logoutText: {
    color: '#C44B4B',
    fontWeight: '600',
  },
});

export default ProfileScreen;


